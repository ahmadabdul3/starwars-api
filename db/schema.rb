# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180831195750) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "people", force: :cascade do |t|
    t.string "name"
    t.string "height"
    t.string "mass"
    t.string "hair_color"
    t.string "eye_color"
    t.string "birth_year"
    t.string "gender"
    t.string "homeworld"
    t.jsonb "films"
    t.jsonb "species"
    t.jsonb "vehicles"
    t.jsonb "starships"
    t.string "url"
    t.string "created"
    t.string "edited"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "swapi_id"
    t.string "skin_color"
  end

  create_table "species", force: :cascade do |t|
    t.string "name"
    t.string "classification"
    t.string "designation"
    t.string "average_height"
    t.string "skin_colors"
    t.string "hair_colors"
    t.string "eye_colors"
    t.string "average_lifespan"
    t.string "homeworld"
    t.string "language"
    t.jsonb "people"
    t.jsonb "films"
    t.string "created"
    t.string "edited"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "swapi_id"
  end

end
