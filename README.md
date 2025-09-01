# 2sxc App: CDN (Content Delivery Network) / CloudFlare

This is an experimental app and incomplete ATM.

Goal is to enable DNN web sites to use CloudFlare as a CDN for their static content, improving load times and reducing server load.

## HttpModule StripSelectedCookiesModule

A core problem with DNN 9 and 10 as of 2025-09 is that every single page request will set cookies, which can lead to performance issues when using a CDN like CloudFlare. This module aims to strip unnecessary cookies from requests to improve caching and load times.

To install:

1. Copy the `App_Code` folder to your website root (this will trigger a restart)
1. Configure the module in your web.config or startup code as documented in the code file

> Since both actions would trigger a restart, you may want to prepare the web.config change first,
> and right before saving also copy the folder.

As a result of this, you should see that pages do not set the `languages` cookie nor the `dnn_IsMobile` cookie.
