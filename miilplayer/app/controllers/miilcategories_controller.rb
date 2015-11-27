require 'open-uri'
require './app/controllers/scan_miilcategories_photos.rb'

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
        #res = open('http://miil.me/api/photos/recent/categories/722.json')
        res = open('http://localhost:4567/miilcategories722');
        code, message = res.status
        if code == '200'
            # DBに登録
            #scan_miilcategories_photos(res.read)
            # クライントに返却
            render :json => {
                'category_id' => @categoryId,
                'category_photo' => (ActiveSupport::JSON.decode res.read)
            }
        end
    end
end
