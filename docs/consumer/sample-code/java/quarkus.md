---
sidebar_position: 2
description: Quarkus sample code.
---

# Quarkus

Quarkus is a full-stack, Kubernetes-native Java framework made for Java virtual machines (JVMs) and native compilation, optimizing Java specifically for containers and enabling it to become an effective platform for serverless, cloud, and Kubernetes environments.

Sample code repository contains Quarkus projects that can be used as a reference to implement the Swift APIs.

## OpenAPI Code Generator

The API clients and JSON models are generated using [OpenAPI Generator Maven Plugin](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-maven-plugin).
The plugin is configured to generate the code from the OpenAPI specification and the generated code is placed in the `target/generated-sources/openapi` folder.

Below example shows the configuration of the plugin in the `pom.xml` file for the Spring Boot project.
The library used to make the API requests is `microprofile` and the OpenAPI specification is located in the `src/main/openapi` folder.

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
                <library>microprofile</library>
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
                <modelPackage>${project.groupId}.oas.model</modelPackage>
                <apiPackage>${project.groupId}.oas.api</apiPackage>
                <configOptions>
                <openApiNullable>false</openApiNullable>
                <configKey>messagingApi</configKey>
                </configOptions>
                <additionalProperties>
                    <additionalProperty>disableMultipart=true,rootJavaEEPackage=jakarta</additionalProperty>
                </additionalProperties>
                // highlight-start
                <inputSpec>${project.basedir}/src/main/openapi/messaging-api.yaml</inputSpec>
                // highlight-end
            </configuration>
        </execution>
    </executions>
</plugin>
```

### OAuth 2.0 Client

[Quarkus OICD Client extension](https://es.quarkus.io/guides/security-openid-connect-client-reference) is used to authenticate with the OAuth 2.0 Authorization Server and obtain an access token. The token lifecycle is managed by the extension and the token is automatically refreshed when it expires.

The JWT assertion is created using (SmallRye JWT library)[https://smallrye.io/docs/smallrye-jwt/index.html]. Below code snippet shows how to create a JWT assertion.

```java
Instant issuedAt = Instant.now();
Instant expiresAt = issuedAt.plus(Duration.ofSeconds(15));

String jwt = Jwt.audience(audience)
    .subject(channelCertificate.getPrincipal())
    .issuer(issuer.get())
    .claim(Claims.jti.name(), UUID.randomUUID().toString())
    .issuedAt(issuedAt)
    .expiresAt(expiresAt)
    .jws()
    .header("x5c", Collections.singletonList(channelCertificate.getEncoded())).sign();
```

### Swift signature

To create the signature the same library is used. The signature is injected as a header in the `SignatureInterceptor` class.

Below code snippet shows how to create the signature.

```java title="src/main/SignatureInterceptor.java"
@Provider
@ConstrainedTo(RuntimeType.CLIENT)
@Priority(Priorities.HEADER_DECORATOR)
public class SignatureInterceptor implements WriterInterceptor, ClientRequestFilter {

    private static final String PATH_PROPERTY = "URI";

    @Inject
    Logger log;

    @Inject
    ChannelCertificate signingCertificate;

    @Override
    public void filter(ClientRequestContext requestContext) throws IOException {
        requestContext.setProperty(PATH_PROPERTY, requestContext.getUri());
    }

    @Override
    public void aroundWriteTo(WriterInterceptorContext context)
            throws IOException, WebApplicationException {
        OutputStream old = context.getOutputStream();
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        context.setOutputStream(buffer);
        context.proceed(); // let MessageBodyWriter do it's job
        byte[] body = buffer.toByteArray();
        String signature = sign(body, (URI) context.getProperty(PATH_PROPERTY));
        context.getHeaders().putSingle("X-SWIFT-Signature", signature);
        old.write(body);
        context.setOutputStream(old);
    }

    public String sign(byte[] body, URI uri) {
        // Calculate digest from body and encode it in Base64
        byte[] base64 = java.util.Base64.getEncoder().encode(body);
        byte[] digest = MessageDigest.getInstance("SHA-256").digest(base64);
        String base64Digest = java.util.Base64.getEncoder().encodeToString(digest)

        Instant issuedAt = Instant.now();
        Instant expiresAt = issuedAt.plus(Duration.ofSeconds(15));

        // Create signed JWT with digest private claim
        return Jwt.audience(url.substring("https://".length()))
            .subject(channelCertificate.getPrincipal())
            .issuer(issuer.get())
            .claim(Claims.jti.name(), UUID.randomUUID().toString())
            .issuedAt(issuedAt)
            .expiresAt(expiresAt)
            .claim("digest", base64Digest)
            .jws()
            .header("x5c", Collections.singletonList(channelCertificate.getEncoded())).sign();
    }
}

```
