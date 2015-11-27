class MiilcategoriesController < ApplicationController

    # GET /miilcategories
    # GET /miilcategories.json
    def index
        @categoryList = File.read(Rails.root.join('app').join('assets').join('javascripts').join('miilcategories.json'))
        render :json => @categoryList
    end
end
