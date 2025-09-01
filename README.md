# 2sxc App: CDN (Content Delivery Network) / CloudFlare

This is an experimental app and incomplete ATM.

Goal is to enable DNN web sites to use CloudFlare as a CDN for their static content, improving load times and reducing server load.

## Installation

To get everything to work, you must

1. [Install the HTTP Module](#install-httpmodule-stripselectedcookiesmodule) to strip unnecessary DNN cookies
1. [Prepare DNN](#install--prepare-dnn) to set `public` caching as allowed
1. Add the App to specific pages you want to configure
1. Probably add the App to the theme/skin, so it can set defaults
1. Configure the CDN, typically CloudFlare

### Install HttpModule StripSelectedCookiesModule

A core problem with DNN 9 and 10 as of 2025-09 is that every single page request will set cookies, which can lead to performance issues when using a CDN like CloudFlare. This module aims to strip unnecessary cookies from requests to improve caching and load times.

To install:

1. Copy the `App_Code` folder to your website root (this will trigger a restart)
1. Configure the module in your web.config or startup code as documented in the code file

> Since both actions would trigger a restart, you may want to prepare the web.config change first,
> and right before saving also copy the folder.

As a result of this, you should see that pages do not set the `languages` cookie nor the `dnn_IsMobile` cookie.

## Install / Prepare DNN

To get DNN to work properly, you must change the DNN Server settings to use `public` Unauthenticated Capability.
You can find this in:

1. ⚙️ Settings
1. Tab `Server Settings`
1. Sub tab `Performance`

> This step is crucial, because the code on each page will want to set expiry headers.
> That would fail, if the initial value is not `public`, since the .net HTTP Response object can never
> _upgrade_ cacheability any more, only add more restrictions.

## Next

1. Create a real 2sxc App with global configuration

## History

1. Created first PoC of the strip-cookies 2025-08-25
