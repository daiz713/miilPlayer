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
end
