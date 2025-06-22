fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'
name 'prp_admin'
author 'Paradoxtended'
version '1.0.0'
repository 'https://github.com/paradoxtended/prp_admin'
description 'An advanced admin menu.'

dependencies {
    '/server:6116',
    '/onesync',
    'oxmysql',
    'ox_lib',
}

shared_scripts {
    '@ox_lib/init.lua',
    '@prp_lib/init.lua'
}

ui_page 'web/build/index.html'

client_scripts {
    'init.lua',
    'src/client/*.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'init.lua',
    'src/server/*.lua'
}

files {
    'static/config.json',
    'web/build/index.html',
    'web/build/assets/*.js',
    'web/build/assets/*.css',
    'locales/*.json'
}