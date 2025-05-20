# Docker build
docker build -t <your_image_name> <path_to_dockerfile>
docker build -t nurhavid-1/from from

# List images
docker images
docker images -a

# Show Progress
docker build --progress=plain -t <your_image_name> <path_to_dockerfile>
docker build --progress=plain --no-cache -t nurhavid-1/from from

# Cache
docker build --no-cache -t <your_image_name> <path_to_dockerfile>
docker build --no-cache -t nurhavid-1/from from


# Label
docker build -t <your_image_name> --label <label_name>=<label_value> <path_to_dockerfile>
docker build -t nurhavid-1/from --label version=1.0 from


# EXPOSE# Expose i


curl -X POST -H 'Content-Type:application/json' -d '{"chat_id":"1991174783","text":"[SUCCESS] Ukata api build success!","disable_notification":false}' "https://api.telegram.org/bot7859816771:AAGUKuWDBCk36Qqzu8anbKtVp_atZnEqZbE/sendMessage"
curl -X POST -H 'Content-Type:application/json' -d '{"chat_id": "1991174783", "text": "[SUCCESS] Ukata api build success!", "disable_notification": false}' "https://api.telegram.org/bot7859816771:AAGUKuWDBCk36Qqzu8anbKtVp_atZnEqZbE/sendMessage"
curl -X POST -H "Content-Type:application/json" -d "{\"chat_id\":\"1991174783\",\"text\":\"[SUCCESS] Ukata api build success!\",\"disable_notification\":false}" "https://api.telegram.org/bot7859816771:AAGUKuWDBCk36Qqzu8anbKtVp_atZnEqZbE/sendMessage"