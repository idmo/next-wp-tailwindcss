
# NextJS, Tailwindcss, WordPress Starter

A foundational starter for using WordPress as a Headless CMS with NextJS and Tailwindcss.

The goal of this starter is to enable the creation of multiple sites using NextJS and Tailwindcss for the presentation layer and WordPress as a single Headless CMS for all the sites.

## Presentation Layer

I wanted the developer experience of NextJS and Tailwindcss to create the templates for standardized pages like blog posts.

## Headless CMS

If you've ever managed more than one WordPress site, you know what a PITA they can be. Enough said.

## Goals

I just want to be able to create multiple sites using one instance of WordPress. Second, I want to be able to post things to the blog from anywhere whether it's a laptop or iPad. More complex pages etc. will be done on at the desktop.

## Acknowledgements

- [Based on the awesome WP Starter from Colby Fayock](https://github.com/colbyfayock/next-wordpress-starter)

## Authors

- [@idmo](https://github.com/idmo)

## Features

It's pretty featureless. It's only function is to pull Wordpress site by Posts, Tags, and Categories. You can do the rest like creating Components.

## FAQ

### Where are the Components?

There aren't any. The point of this starter is to get the most fundamental features of WordPress working with NextJS and Tailwindss. Those features are Posts, Tags, and Categories.

## Instructions

_There are way too many tutorials on how to install and set up WordPress to list here. Google it._

If you already have a WordPress site up and running, install the following Plug-ins:

- [WPGraphQL](https://www.wpgraphql.com)
- [WPGraphQL Yoast SEO Addon](https://wordpress.org/plugins/add-wpgraphql-seo/)
- [Yoast WP Plugin](https://yoast.com/wordpress/plugins/)

### Set Up

Once installed, create a `.env.local` file in your project and include the following…
```WORDPRESS_GRAPHQL_ENDPOINT="https://path-to-your-site.com/graphql"```

Run the following in your terminal to install all the necessary Node Modules.

`node i`

After everyting has been installed, you should be able to fire it up and run it locally. Just fire off the following command in your terminal:

`npm run dev`

If everything is working as it should, you will be able to view the home page at `localhost:3000` or whichever port you are set up to run on.