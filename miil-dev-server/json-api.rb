# coding: utf-8
require 'sinatra'
require 'json'

get '/miilcategories722' do
  data = File.read('test-miil-cate-722.json');
  hash = JSON.parse(data)
  content_type :json, :charset => 'utf-8'
  hash.to_json
end
