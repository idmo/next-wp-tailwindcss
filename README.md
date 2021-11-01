# Next.js WordPress Starter

## ⚡️ Quick Start

### Requirements

* [WordPress](https://wordpress.org/)
* [WPGraphQL](https://www.wpgraphql.com/)

```bash
yarn create next-app -e https://github.com/colbyfayock/next-wpgraphql-basic-starter
# or
npx create-next-app -e https://github.com/colbyfayock/next-wpgraphql-basic-starter
```

Add an `.env.local` file to the root with the following:

```bash
WORDPRESS_GRAPHQL_ENDPOINT="http://yourhost.com/graphql"
```

I wanted to create a starter for NextJS and WordPress that would enable me to use one instance of a headless CMS to serve multiple sites. I didn't want replicate the one big problem I have with WP – it's tight integration with the presentation layer. WP is amazing at managing content, but customizing the presentation is a royal pain in my ass.
