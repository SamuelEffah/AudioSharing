import logging
from flask import Flask, Response, request
from flask_restful import Resource
import boto3
from botocore.exceptions import ClientError
import os
import json

class Audio(Resource):

    def get(self):
        return {
            'hello': 'wor22ld',
            'accces': ""
        }



    def post(self):
        if request.files:
        
            data = request.form.to_dict(flat=True)
            data = json.loads(data['data'])
            print(data['user_id'])
            upload_type = data['type']
            user_id = data["user_id"].replace('-','_')
            

            audio_file = request.files["file"]
            audio_name = audio_file.filename.split(".")
            format_name = audio_name[0].replace(' ','_')
            format_name = audio_name[0].replace('-','_')
            audio_type = audio_name[-1]
       
            print(audio_type)
            if upload_type=='audio' and  audio_type.lower() in ["mp3", "wav"]:
                object_name = format_name+"_"+user_id+"."+audio_type
                
                url =  s3_storage(audio_file, object_name)
               
                return {
                   "status": "successful",
                   "file_url": url
                    }


            elif upload_type =='image':
                object_name = format_name+"_"+user_id+"."+audio_type
                url =  s3_storage(audio_file, object_name, folder="images/")
                return {
                   "status": "successful",
                   "file_url": url
                    }
        return{
            "status": "failed",
            "msg": "Wrong file type"
        } 


            # s3_storage(audio_file)
           
        
    




def s3_storage(file,object_name,folder="audio/"):
    
    bucket = "podcastcapstone"
    s3 = boto3.client('s3', aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
     aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))
    
 
    try:
        res = s3.upload_fileobj(file, bucket,folder+object_name
        )
        s3.put_object_acl(
            ACL='public-read',
            Bucket=bucket,
            Key=folder+object_name
        )
        t = "https://"+ bucket +".s3.ca-central-1.amazonaws.com/"+folder+ object_name
        print(t)
        return t 
    except ClientError as e:
        print(e)
        logging.error(e)
        return False 
    
   
        

     




