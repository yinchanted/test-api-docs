// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Swift Developer Documentation',
  tagline: 'Swift API documentation and sample code',
  favicon: 'img/favicon.ico',
  noIndex: true,

  // Set the production url of your site here
  url: 'https://developer.swift.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  //organizationName: '', // Usually your GitHub org/user name.
  //projectName: '', // Usually your repo name.

  // GitHub Pages adds a trailing slash to Docusaurus URLs by default. 
  // It is recommended to set a trailingSlash config (true or false, not undefined).
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      prism: {
        additionalLanguages: ['bash', 'json', 'python', 'csharp', 'java', 'powershell'],
        theme: prismThemes.dracula,
        darkTheme: prismThemes.dracula,
      },
      navbar: {
        logo: {
          alt: 'Swift',
          src: 'img/logo.svg',
          srcDark: 'img/logo_dark.svg'
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'consumer',
            position: 'left',
            label: 'API Consumer',
          },
          {
            type: 'docSidebar',
            sidebarId: 'provider',
            position: 'left',
            label: 'API Provider',
          },
          /*{
            type: 'dropdown',
            label: 'Developer Portal',
            position: 'left',
            items: [
              {
                label: 'APIs documentation',
                href: 'https://developer.swift.com/reference',
              },
              {
                label: 'My Apps',
                href: 'https://developer.swift.com/myapps',
              },
              {
                label: 'API Catalogue',
                href: 'https://developer.swift.com/apis',
              },
              {
                label: 'Community',
                href: 'https://developer.swift.com/community',
              },
              {
                label: 'API Playground',
                href: 'https://developer.swift.com/playground',
              },
            ],
          },*/
          {href: 'https://www.swift.com/', label: 'Swift', position: 'right'},
          {
            href: 'https://github.com/swiftinc',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'More',
            items: [
              {
                label: 'Partner program',
                to: 'https://developer.swift.com/partners',
              },
            ],
          },
          {
            title: 'Swift Developer Portal',
            items: [
              {
                label: 'Swift APIs',
                href: 'https://developer.swift.com/apis',
              },
              {
                label: 'API reference',
                href: 'https://developer.swift.com/reference',
              },
              {
                label: 'Partners',
                href: 'https://developer.swift.com/partners',
              },
              {
                label: 'Support',
                href: 'https://developer.swift.com/support',
              },
            ],
          },
          {
            title: 'Swift',
            items: [
              {
                label: 'Who we are',
                href: 'https://www.swift.com/about-us/vision_mission-values',
              },
              {
                label: 'Terms of Use',
                href: 'https://developer.swift.com/sites/default/files/SWIFT_Developer_Portal_TermsofUse_2019.pdf',
              },
              {
                label: 'Privacy Statement',
                href: 'https://developer.swift.com/sites/default/files/PRIVACY_STATEMENT_SWIFT_DEVELOPER_PORTAL.pdf',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Swift`,
      },
    }),
    plugins: [require.resolve('docusaurus-lunr-search')]
};

module.exports = config;
