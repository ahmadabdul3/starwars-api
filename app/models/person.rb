class Person < ApplicationRecord
  serialize :films, Array
  serialize :species, Array
  serialize :vehicles, Array
  serialize :starships, Array
end
