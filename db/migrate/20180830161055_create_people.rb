class CreatePeople < ActiveRecord::Migration[5.1]
  def change
    create_table :people do |t|
      t.string :name
      t.string :height
      t.string :mass
      t.string :hair_color
      t.string :eye_color
      t.string :birth_year
      t.string :gender
      t.string :homeworld
      t.jsonb :films
      t.jsonb :species
      t.jsonb :vehicles
      t.jsonb :starships
      t.string :url
      t.string :created
      t.string :edited

      t.timestamps
    end
  end
end
