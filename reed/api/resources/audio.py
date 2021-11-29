import logging
from flask import Flask, Response, request, session
from flask_restful import Resource
import boto3
from botocore.exceptions import ClientError
import os

import json
from pydub import AudioSegment
class Audio(Resource):

    def get(self):
        params = request.query_string.decode('utf-8')
        params = params.split('=')
        ob = params[1]
     
        temp_file = ob.split('.')[0] + ".wav"
        if os.path.isfile(temp_file):
            return Response(generate(temp_file), mimetype="audio/x-wav")
        # ob = "bensound_ukulele_a42bb57a_962a_4d98_a4fc_5564ff162670.mp3"
        delete_file()
        file = download_audio(ob)
        return Response(generate(file), mimetype="audio/x-wav")
      



    def post(self):
        if request.files:
            data = request.form.to_dict(flat=True)
            data = json.loads(data['data'])

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
        if folder == "audio/":
            t = object_name
            return t
        else:
            t = "https://"+ bucket +".s3.ca-central-1.amazonaws.com/"+folder+ object_name
            return t      
      
    except ClientError as e:
        print(e)
        logging.error(e)
        return False 
    

def download_audio(object_name):
    file = "audio/" +object_name
    bucket="podcastcapstone"
    s3 = boto3.client('s3', aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
     aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))
    print(f'dpwnloading...')
    s3.download_file(bucket,file, os.path.basename(file))
    wav_file = AudioSegment.from_mp3(object_name)

    new_wav_file = object_name.split(".")[0] + ".wav"
    print(f'converting to wav...')
    wav_file.export(new_wav_file, format='wav')
    print(f'removing file...')
    os.remove(object_name)
    return new_wav_file
 


def generate(file):

    with open(file, 'rb') as fw:
        data = fw.read(1024)
        while data:
            yield data 
            data = fw.read(1024)


    
def delete_file():
    filenames = os.listdir(os.curdir)
    for filename in filenames:
        if os.path.isfile(filename) and filename.endswith('.wav'):
            os.remove(filename)
            return 
    return

     




