RegisterNUICallback('getPlayers', function (_, cb)
    local players = lib.callback.await('prp_admin:getPlayers', false)
    cb(players)
end)