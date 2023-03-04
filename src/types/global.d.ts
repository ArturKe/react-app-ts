export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
    interface globalRecord {
        id?: number,
        title?: string,
        description?: string,
        selected?: boolean,
        created?: string
    }

    enum typeModal {
        warn = 'warn',
        form = 'form'
    }
    
    interface modalConfig {
        type: string,
        title?: globalRecord['title'],
        titleForm?: string,
        description?: globalRecord['description'],
        fields?: field[],
        record?: globalRecord,
        // actions?: globalActions
        actions?: action[]
    }

    interface action {
        name: String,
        action: (record:globalRecord)=>void
    }

    interface field {
        name: string,
        label: string,
        value: string | number
    }

    interface globalActions {
        delete: (id)=>void,
        deleteAll: ()=>void,
        create: (record)=>void,
        edit: (record)=>void
        default: ()=>void
    }
}