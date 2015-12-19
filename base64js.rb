# ruby base64js.rb path/to/img > path/to/base64js
require 'base64';

# エンコードするJPEGファイルのパス
jpg_file_path = ARGV[0]

puts '// '+ jpg_file_path
puts 'var sampleBase64Photos = sampleBase64Photos || [];'
print 'sampleBase64Photos.push("data:image/png;base64,'
print Base64.strict_encode64(File.new(jpg_file_path).read)
puts '");'
puts '/* base64js.rb */'
