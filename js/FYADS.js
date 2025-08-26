const FYADS = (...managers)=>{
    return {
        enableAll:(isEnabled)=>{
            managers.forEach(manager=>{
                manager.setEnabled(isEnabled);
            });
        },
        enable:(manager)=>{
            managers.filter(m=>m.getId() === manager.getId())
                .forEach(manager=>manager.setEnabled(true));
            return this;
        },
        disable:(manager)=>{
            managers.filter(m=>m.getId() == manager.getId())
                .forEach(manager=>manager.setEnabled(false));
            return this;
        },
    }
}