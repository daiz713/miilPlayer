require 'open-uri'
require './app/controllers/scan_photos.rb'

class MiilusersController < ApplicationController

    def index
    end

    # userが投稿した写真を取得する
    # GET /miilusers/daiz
    # GET /miilusers/daiz.json
    def show
        @userName = params[:id]
        miilApiUrl = 'http://api.miil.me/api/users/'+ @userName +'/photos/public.json'
        #res = open(miilApiUrl)
        res = open('http://localhost:4567/miilusersdaiz');
        code, message = res.status
        if code == '200'
            # DBに登録
            data = res.read
            dataset, next_page = scan_photos(data)
            # クライントに返却
            render :json => {
                'user_name' => @userName,
                'photo' => dataset,
                'next_page' => next_page
            }
        end
    end
end
