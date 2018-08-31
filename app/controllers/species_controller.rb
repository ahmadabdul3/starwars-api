# frozen_string_literal: true

class SpeciesController < ApplicationController
  def show
    species = Specie.find_by_swapi_id(params['id'])

    if species
      render json: { resource: species }
    else
      render json: { message: 'cant find species' }, status: :not_found
    end
  end

  def create
    species = Specie.new(valid_params)

    if species.save
      render json: { resource: species }
    else
      # just sending a bad request back for now
      render json: { message: 'species creation failed' }, status: :bad_request
    end
  end

  private

  def valid_params
    params.require(:species).permit(
      :name,
      :classification,
      :designation,
      :average_height,
      :skin_colors,
      :hair_colors,
      :eye_colors,
      :average_lifespan,
      :homeworld,
      :language,
      :created,
      :edited,
      :url,
      :swapi_id,
      people: [],
      films: [],
    )
  end
end
