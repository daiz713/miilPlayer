# miilから提供されている写真の生データから，必要なものをDBに保存する
def save_miil_raw (photo_hash)
    photo_id = photo_hash['photo_id']
    photo_title = photo_hash['title']
    photo_url = photo_hash['url']
    page_url = photo_hash['page_url']
    category_id = photo_hash['category_id']
    recipe_id = photo_hash['recipe_id']
    user_id = photo_hash['user_id']
    user_name = photo_hash['user_name']
    user_icon_url = photo_hash['user_icon_url']
end
