require 'base64'

# miilから提供されている写真の生データから，必要なものをDBに保存する
def save_miil_raw (hash)
    res = []
    for photo_hash in hash['photos'] do
        # 必要な情報を抜粋する
        if photo_hash['venue'] != nil
            venue_id = photo_hash['venue']['venue_id']
            venue_name = photo_hash['venue']['name']
            venue_web = photo_hash['venue']['web']
        else
            venue_id = nil
            venue_name = nil
            venue_web = nil
        end

        dataset = {
            :photo_id      => photo_hash['photo_id'],
            :photo_title   => photo_hash['title'],
            :photo_url     => photo_hash['url'],
            :page_url      => photo_hash['page_url'],
            :category_id   => photo_hash['category_id'],
            :recipe_id     => photo_hash['recipe_id'],
            :user_id       => photo_hash['user']['user_id'],
            :user_name     => photo_hash['user']['username'],
            :user_icon_url => photo_hash['user']['user_icon_url'],
            :venue_id      => venue_id,
            :venue_name    => venue_name,
            :venue_web     => venue_web,
            :taken_at      => photo_hash['taken_at']
        }

        docs = Miilraw.where(:photo_id => photo_hash['photo_id'])
        if docs.size == 0
            photo = Miilraw.new(dataset)
            # photo.save  # ここを無効化すれば保存さない
            puts 'Saved!!!! ' + photo_hash['url']
        elsif
            puts '>>>>>>>>> ' + docs[0].photo_url
        end

        # photoをbase64エンコードする
        # 6 ~ 8秒（10 ~ 20枚）
        # dataset[:photo_url] = 'data:image/png;base64,' + Base64.strict_encode64(open(dataset[:photo_url]).read)

        res.push(dataset)
    end

    return {:photos => res}
end
