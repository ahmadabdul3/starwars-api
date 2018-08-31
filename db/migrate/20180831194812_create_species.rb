class CreateSpecies < ActiveRecord::Migration[5.1]
  def change
    create_table :species do |t|
      t.string :name
      t.string :classification
      t.string :designation
      t.string :average_height
      t.string :skin_colors
      t.string :hair_colors
      t.string :eye_colors
      t.string :average_lifespan
      t.string :homeworld
      t.string :language
      t.jsonb :people
      t.jsonb :films
      t.string :created
      t.string :edited
      t.string :url

      t.timestamps
    end
  end
end
