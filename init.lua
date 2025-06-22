-- Do not modify this file at all. This isn't a "config" file.

local configFile = LoadResourceFile(cache.resource, 'static/config.json')

if not configFile then
    error("Did you modify 'init.lua' or remove 'static/config.json' ?? If no, then check your JSON syntax in 'static/config.json'.", 1)
    return
end

config = json.decode(configFile)

client = {}

local context = IsDuplicityVersion() and 'server' or 'client'
local framework = GetResourceState('es_extended') == 'started' and 'esx' 
               or GetResourceState('qb-core') == 'started' and 'qb' or nil

local chunk = LoadResourceFile('prp_lib', ('resource/callbacks/%s/%s.lua'):format(context, framework))

Framework = assert(load(chunk)())