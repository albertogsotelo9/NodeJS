import knex from 'knex'

class ClienteSQLMss{
    constructor(options){
        this.knex = knex(options)
    }

    crearTabla(){
        return this.knex.schema.dropTableIfExists('mensajes')
            .finally(()=>{
                return this.knex.schema.createTable('mensajes', table =>{
                    table.increments('id').primary()
                    table.string('author', 50).notNullable()
                    table.string('message', 1000).notNullable()
                    table.date('hora').notNullable()
                    
                })
            })
    }

    insertarMensajes(mensajes){
        return this.knex('mensajes').insert(mensajes)
    }

    listarMensajes(){
        return this.knex('mensajes').select('*')
    }

    borrarMensajePorId(id){
        return this.knex.from('mensajes').where('id', id).del()
    }

   
    close(){
        this.knex.destroy()
    }
}

export default ClienteSQLMss