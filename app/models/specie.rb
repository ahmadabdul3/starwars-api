class Specie < ApplicationRecord
  serialize :films, Array
  serialize :people, Array

  def as_json(*)
    super.except("id", "swapi_id", "created_at", "updated_at")
  end
end
