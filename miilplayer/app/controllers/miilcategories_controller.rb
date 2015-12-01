require 'open-uri'
require './app/controllers/scan_photos.rb'

class MiilcategoriesController < ApplicationController

    # miilカテゴリの一覧を取得
    # GET /miilcategories
    # GET /miilcategories.json
    def index
        @categoryList = File.read(Rails.root.join('app').join('assets').join('javascripts').join('miilcategories.json'))
        # クライントに返却
        render :json => @categoryList
    end

    # miilカテゴリに含まれる写真一覧を取得
    # GET /miilcategories/722
    # GET /miilcategories/722.json
    def show
        @categoryId = params[:id]
        miilApiUrl = 'http://miil.me/api/photos/recent/categories/'+ @categoryId +'.json'
        #res = open(miilApiUrl)
        res = open('http://localhost:4567/miilcategories' + @categoryId);
        code, message = res.status
        if code == '200'
            # DBに登録
            data = res.read
            dataset, next_page = scan_photos(data)
            # クライントに返却
            render :json => {
                'category_id'    => @categoryId,
                'photo' => dataset,
                'next_page' => next_page
            }
        end
    end
end
