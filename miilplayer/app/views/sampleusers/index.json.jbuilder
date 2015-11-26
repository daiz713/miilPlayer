json.array!(@sampleusers) do |sampleuser|
  json.extract! sampleuser, :id, :name, :email
  json.url sampleuser_url(sampleuser, format: :json)
end
