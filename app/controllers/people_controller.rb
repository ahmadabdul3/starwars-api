# frozen_string_literal: true

class PeopleController < ApplicationController
  def show
    person = Person.find_by_swapi_id(params['id'])

    if person
      render json: { person: person }
    else
      render json: { message: 'cant find person' }, status: :not_found
    end
  end

  def create
    person = Person.new(valid_params)

    if person.save
      render json: { person: person }
    else
      # just sending a bad request back for now
      render json: { message: 'person creation failed' }, status: :bad_request
    end
  end

  private

  def valid_params
    params.require(:person).permit(
      :name,
      :height,
      :mass,
      :hair_color,
      :skin_color,
      :eye_color,
      :birth_year,
      :gender,
      :homeworld,
      :url,
      :created,
      :edited,
      :created_at,
      :updated_at,
      :swapi_id,
      films: [],
      species: [],
      vehicles: [],
      starships: [],
    )
  end
end
