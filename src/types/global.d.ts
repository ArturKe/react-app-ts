export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
    interface globalRecord {
        id: number,
        title: string,
        description: string,
        selected: boolean,
        created: string
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
        fields?: object[],
        actionName?: string,
        actions?: {
            delete: (id)=>void,
            deleteAll: ()=>void,
            create: (id, title, desc)=>void,
            edit: (id, title, desc)=>void
        }
    }
}