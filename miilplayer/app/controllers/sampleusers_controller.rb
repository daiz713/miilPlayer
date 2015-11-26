class SampleusersController < ApplicationController
  before_action :set_sampleuser, only: [:show, :edit, :update, :destroy]

  # GET /sampleusers
  # GET /sampleusers.json
  def index
    @sampleusers = Sampleuser.all
  end

  # GET /sampleusers/1
  # GET /sampleusers/1.json
  def show
  end

  # GET /sampleusers/new
  def new
    @sampleuser = Sampleuser.new
  end

  # GET /sampleusers/1/edit
  def edit
  end

  # POST /sampleusers
  # POST /sampleusers.json
  def create
    @sampleuser = Sampleuser.new(sampleuser_params)

    respond_to do |format|
      if @sampleuser.save
        format.html { redirect_to @sampleuser, notice: 'Sampleuser was successfully created.' }
        format.json { render :show, status: :created, location: @sampleuser }
      else
        format.html { render :new }
        format.json { render json: @sampleuser.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sampleusers/1
  # PATCH/PUT /sampleusers/1.json
  def update
    respond_to do |format|
      if @sampleuser.update(sampleuser_params)
        format.html { redirect_to @sampleuser, notice: 'Sampleuser was successfully updated.' }
        format.json { render :show, status: :ok, location: @sampleuser }
      else
        format.html { render :edit }
        format.json { render json: @sampleuser.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sampleusers/1
  # DELETE /sampleusers/1.json
  def destroy
    @sampleuser.destroy
    respond_to do |format|
      format.html { redirect_to sampleusers_url, notice: 'Sampleuser was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sampleuser
      @sampleuser = Sampleuser.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sampleuser_params
      params.require(:sampleuser).permit(:name, :email)
    end
end
