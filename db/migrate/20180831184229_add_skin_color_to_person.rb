class AddSkinColorToPerson < ActiveRecord::Migration[5.1]
  def change
    add_column :people, :skin_color, :string
  end
end
