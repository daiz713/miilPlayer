# miilから提供されている写真の生データから，必要なものをDBに保存する
def save_miil_raw (hash)
    for photo_hash in hash['photos'] do
        # 必要な情報を抜粋する
        photo_id = photo_hash['photo_id']
        photo_title = photo_hash['title']
        photo_url = photo_hash['url']
        page_url = photo_hash['page_url']
        category_id = photo_hash['category_id']
        recipe_id = photo_hash['recipe_id']
        user_id = photo_hash['user']['user_id']
        user_name = photo_hash['user']['username']
        user_icon_url = photo_hash['user']['user_icon_url']

        docs = Miilraw.where(:photo_id => photo_id)
        if docs.size == 0
            photo = Miilraw.new(
                :photo_id      => photo_id,
                :photo_title   => photo_title,
                :photo_url     => photo_url,
                :page_url      => page_url,
                :category_id   => category_id,
                :recipe_id     => recipe_id,
                :user_id       => user_id,
                :user_name     => user_name,
                :user_icon_url => user_icon_url
            )
            photo.save
            puts 'Saved!!!! ' + photo_url
        elsif
            puts '>>>>>>>>> ' + docs[0].photo_url
        end
    end
end
