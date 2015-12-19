class Miilraw
  include Mongoid::Document
  include Mongoid::Timestamps
  field :photo_id, type: String
  field :photo_title, type: String
  field :photo_url, type: String
  field :page_url, type: String
  field :category_id, type: String
  field :recipe_id, type: String
  field :user_id, type: String
  field :user_name, type: String
  field :user_icon_url, type: String
  field :taken_at, type: String
  field :venue_name, type: String
  field :venue_id, type: String
  field :venue_web, type: String
end
