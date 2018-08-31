class Person < ApplicationRecord
  serialize :films, Array
  serialize :species, Array
  serialize :vehicles, Array
  serialize :starships, Array

  def as_json(*)
    super.except("id", "swapi_id", "created_at", "updated_at")
  end
end
