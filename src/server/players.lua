-- Change a table if you are using a different one (ESX is using users so ESX servers do not change this)
local query = 'SELECT * FROM users'

lib.callback.register('prp_admin:getPlayers', function(source)
    local player = Framework.getPlayerFromId(source)

    if not player or not player:hasOneOfGroups(config.AdminMenu.AllowedGroups) then return end

    local players = MySQL.prepare.await(query)

    ---@type { charName: string, stateId: number, license: string, accName: string, online: boolean }[]
    local users = {}

    for _, player in pairs(players) do
        local online = Framework.getPlayerFromIdentifier(player.identifier)
        local editedIdentifier = player.identifier:match(':(.+)')

        table.insert(users, {
            charName = player.firstname .. ' ' .. player.lastname,
            stateId = player.id,
            license = editedIdentifier,
            accName = online and GetPlayerName(online.source) or 'OFFLINE',
            online = online and true or false
        })
    end

    return users
end)