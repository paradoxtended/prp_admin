lib.locale()

Framework.onPlayerLoaded(function()
	SetTimeout(500, function ()
        local locales = lib.getLocales()

        while not client.uiLoaded do Wait(50) end

        SendNUIMessage({
            action = 'init',
            data = {
                locale = locales
            }
        })
    end)
end)

RegisterNetEvent('prp_admin:openAdminMenu', function()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'openAdminMenu',
        data = {
            players = {
                total = 154,
                medical = 12,
                police = 17,
                doj = 2
            },
            admins = {
                { name = 'Ravage', role = 'admin' }
            },
            dashboard = {
                { time = '11:00AM', players = 120 },
                { time = '11:05AM', players = 152 }
            }
        }
    })
end)

RegisterNUICallback('closeAdminMenu', function (_, cb)
    cb(1)
    SetNuiFocus(false, false)
end)

RegisterNUICallback('uiLoaded', function(_, cb)
	client.uiLoaded = true
	cb(1)
end)