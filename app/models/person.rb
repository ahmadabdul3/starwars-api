class Person < ApplicationRecord
  serialize :films, Array
  serialize :species, Array
  serialize :vehicles, Array
  serialize :starships, Array

  def as_json(*)
    super.except("id", "swapi_id")
  end
end
