fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'
name 'prp_fishing'
author 'Paradoxtended'
version '1.0.0'
repository 'https://github.com/paradoxtended/prp_admin'
description 'An advanced admin menu for FiveM'

dependencies {
    '/server:6116',
    '/onesync',
    'oxmysql',
    'ox_lib',
}

ui_page 'web/build/index.html'

shared_scripts {
    '@ox_lib/init.lua',
    '@prp_lib/init.lua',
    'static/config.json'
}

files {
    'locales/*.json',
    'web/build/index.html',
    'web/build/**/*',
}