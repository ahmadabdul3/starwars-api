class AddSwapiIdToSpecie < ActiveRecord::Migration[5.1]
  def change
    add_column :species, :swapi_id, :string
  end
end
