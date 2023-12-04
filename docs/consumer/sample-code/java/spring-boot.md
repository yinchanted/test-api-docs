---
sidebar_position: 1
description: Spring Boot sample code
---

# Spring Boot

Spring Boot is a framework that helps to create stand-alone, production-grade Spring-based applications easily.

Sample code repository contains Quarkus projects that can be used as a reference to implement the Swift APIs.

## OpenAPI Code Generator

The API clients and JSON models are generated using [OpenAPI Generator Maven Plugin](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-maven-plugin).
The plugin is configured to generate the code from the OpenAPI specification and the generated code is placed in the `target/generated-sources/openapi` folder.

Below example shows the configuration of the plugin in the `pom.xml` file for the Spring Boot project.
The library used to make the API requests is `resttemplate` and the OpenAPI specification is located in the `src/main/openapi` folder.

:::info
API clients for other API products can be generated as well using the OpenAPI Generator Maven Plugin. Change the `<inputSpec>` property to point to the desired file to generate the code for another API product.
:::

```xml title="pom.xml"
<plugin>
    <groupId>org.openapitools</groupId>
    <artifactId>openapi-generator-maven-plugin</artifactId>
    <version>7.1.0</version>
    <executions>
        <execution>
            <phase>generate-sources</phase>
            <goals>
                <goal>generate</goal>
            </goals>
            <configuration>
                <generatorName>java</generatorName>
                // highlight-start
                <library>resttemplate</library>
                // highlight-end
                <skipIfSpecIsUnchanged>true</skipIfSpecIsUnchanged>
                <generateApis>true</generateApis>
                <generateApiDocumentation>false</generateApiDocumentation>
                <generateApiTests>false</generateApiTests>
                <generateModels>true</generateModels>
                <generateModelDocumentation>false</generateModelDocumentation>
                <generateModelTests>false</generateModelTests>
                <skipValidateSpec>false</skipValidateSpec>
                <generateSupportingFiles>true</generateSupportingFiles>
                <configOptions>
                    <useJakartaEe>true</useJakartaEe>
                    <generateClientAsBean>false</generateClientAsBean>
                </configOptions>
                <modelPackage>${project.groupId}.oas.model</modelPackage>
                <apiPackage>${project.groupId}.oas.api</apiPackage>
                // highlight-start
                <inputSpec>
                    ${project.basedir}/src/main/openapi/SWIFT-API-Swift-Messaging-1.1.0-resolved.yaml
                </inputSpec>
                // highlight-end
            </configuration>
        </execution>
    </executions>
</plugin>
```

## Spring Boot

### OAuth 2.0 Client

[The OAuth 2.0 Client ](https://docs.spring.io/spring-security/reference/servlet/oauth2/client/index.html) is used to authenticate with the OAuth 2.0 Authorization Server and obtain an access token.
[JWT Bearer](https://docs.spring.io/spring-security/reference/servlet/oauth2/client/authorization-grants.html#oauth2Client-jwt-bearer-grant) guide explains how to use the OAuth 2.0 Client to obtain a JWT Bearer token.

Before making any API request the token validity is checked and if the token is expired a new token is obtained. All this logic is implemented in a `ClientHttpRequestInterceptor` which is added to the `RestTemplate` used to make the API requests.

```java title="src/main/AuthorizationInterceptor.java"
@Component
public class AuthorizationInterceptor implements ClientHttpRequestInterceptor {

    private static final String BEARER_WITH_SPACE = "Bearer ";

    final OAuth2AuthorizedClientManager clientManager;

    AuthorizationInterceptor(OAuth2AuthorizedClientManager clientManager) {
        this.clientManager = clientManager;
    }

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution)
            throws IOException {
        // Attempt to authorize or re-authorize (if required)
        var authorizeRequest = OAuth2AuthorizeRequest.withClientRegistrationId("swift")
                .principal("swift")
                .build();

        // Retrieve the access token or reuse the existing one
        var authorizedClient = clientManager.authorize(authorizeRequest);
        Objects.requireNonNull(authorizedClient, "Client credentials failed, client is null");

        final String token = authorizedClient.getAccessToken().getTokenValue();

        // Set the Bearer token in 'Authorization' header
        request.getHeaders().add(HttpHeaders.AUTHORIZATION, BEARER_WITH_SPACE.concat(token));

        return execution.execute(request, body);
    }
}
```

Jwt assertion is created using [Nimbus JOSE + JWT](https://connect2id.com/products/nimbus-jose-jwt) library. Below code snippet shows how to create a JWT assertion.

```java title="src/main/JwtOperations.java"
public Jwt createAssertion(OAuth2AuthorizationContext oAuth2AuthorizationContext) {
    // Get certificate from keystore
    X509Certificate certificate = (X509Certificate) keystore.getCertificate(keyAlias);

    // Create JWS header with certificate
    JWSHeader header = new JWSHeader.Builder(JWSAlgorithm.RS256)
                    .x509CertChain(Collections.singletonList(Base64.encode(certificate.getEncoded())))
                    .type(JOSEObjectType.JWT).build();

    Instant issuedAt = Instant.now();
    Instant expiresAt = issuedAt.plus(Duration.ofSeconds(15));

    // Create JWT claims
    JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
        .subject(certificate.getSubjectX500Principal().getName())
        .jwtID(UUID.randomUUID().toString())
        .notBeforeTime(Date.from(issuedAt))
        .issueTime(Date.from(issuedAt))
        .expirationTime(Date.from(expiresAt))
        .issuer(oAuth2AuthorizationContext.getClientRegistration().getClientId())
        .audience(Collections.singletonList(audience))
        .build();

    // Sign JWT
    return signJwt(header, jwtClaimsSet);
}
```

### Swift signature

To create the signature the same library is used. Below code snippet shows how to create the signature.

```java title="/src/main/JwtOperations.java"
public String generateSignature(String url, byte[] body) throws JwtException {
    // Calculate digest from body and encode it in Base64
    byte[] base64 = java.util.Base64.getEncoder().encode(body);
    byte[] digest = MessageDigest.getInstance("SHA-256").digest(base64);
    String base64Digest = java.util.Base64.getEncoder().encodeToString(digest)

    // Get certificate from keystore
    X509Certificate certificate = (X509Certificate) keystore.getCertificate(keyAlias);

    // Create JWS header with certificate
    JWSHeader header = new JWSHeader.Builder(JWSAlgorithm.RS256)
                    .x509CertChain(Collections.singletonList(Base64.encode(certificate.getEncoded())))
                    .type(JOSEObjectType.JWT).build();

    Instant issuedAt = Instant.now();
    Instant expiresAt = issuedAt.plus(Duration.ofSeconds(15));

    // Create JWT claims including digest private claim
    JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
        .subject(certificate.getSubjectX500Principal().getName())
        .jwtID(UUID.randomUUID().toString())
        .issueTime(Date.from(issuedAt))
        .expirationTime(Date.from(expiresAt))
        .audience(Collections.singletonList(url.substring("https://".length())))
        .claim("digest", base64Digest)
        .build();

    // Sign JWT
    return signJwt(header, jwtClaimsSet);
}
```

The signature is injected in the `X-SWIFT-Signature` header by the `SignatureInterceptor` interceptor.

```java title="src/main/SignatureInterceptor.java"
@Component
public class SignatureInterceptor implements ClientHttpRequestInterceptor {

    private static final String SIGNATURE_HEADER = "X-SWIFT-Signature";

    private final JwtOperations jwtOperations;

    public SignatureInterceptor(JwtOperations jwtOperations) {
        this.jwtOperations = jwtOperations;
    }

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution)
            throws IOException {
        if (request.getHeaders().containsKey(SIGNATURE_HEADER)) {
            String signature = jwtOperations.generateSignature(request.getURI().toString(), body);
            request.getHeaders().replace(SIGNATURE_HEADER, Collections.singletonList(signature));
        }
        return execution.execute(request, body);
    }
}
```