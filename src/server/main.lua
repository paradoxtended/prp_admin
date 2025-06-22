lib.locale()

lib.addCommand(config.AdminMenu.Command, {
    help = locale('commandHelp'),
    restricted = config.AdminMenu.AllowedGroups
}, function(source)
    TriggerClientEvent('prp_admin:openAdminMenu', source)
end)