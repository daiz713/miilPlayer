class MiilrawsController < ApplicationController
  before_action :set_miilraw, only: [:show, :edit, :update, :destroy]

  # GET /miilraws
  # GET /miilraws.json
  def index
    @miilraws = Miilraw.all
  end

  # GET /miilraws/1
  # GET /miilraws/1.json
  def show
  end

  # GET /miilraws/new
  def new
    @miilraw = Miilraw.new
  end

  # GET /miilraws/1/edit
  def edit
  end

  # POST /miilraws
  # POST /miilraws.json
  def create
    @miilraw = Miilraw.new(miilraw_params)

    respond_to do |format|
      if @miilraw.save
        format.html { redirect_to @miilraw, notice: 'Miilraw was successfully created.' }
        format.json { render :show, status: :created, location: @miilraw }
      else
        format.html { render :new }
        format.json { render json: @miilraw.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /miilraws/1
  # PATCH/PUT /miilraws/1.json
  def update
    respond_to do |format|
      if @miilraw.update(miilraw_params)
        format.html { redirect_to @miilraw, notice: 'Miilraw was successfully updated.' }
        format.json { render :show, status: :ok, location: @miilraw }
      else
        format.html { render :edit }
        format.json { render json: @miilraw.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /miilraws/1
  # DELETE /miilraws/1.json
  def destroy
    @miilraw.destroy
    respond_to do |format|
      format.html { redirect_to miilraws_url, notice: 'Miilraw was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_miilraw
      @miilraw = Miilraw.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def miilraw_params
      params.require(:miilraw).permit(:photo_id, :photo_title, :photo_url, :page_url, :category_id, :recipe_id, :user_id, :user_name, :user_icon_url, :taken_at, :venue_name, :venue_id, :venue_web)
    end
end
