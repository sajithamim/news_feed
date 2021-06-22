# from clinictopic import settings
import http
def send_opt(mobile,otp):
        # print("FUNCTION CALLED")
    conn = http.client.HTTPSConnection("api.msg91.com")
    authkey = "362749Aun2NTDGR60cc4f9eP1"
    headers = { 'content-type': "application/json" }
    url = "http://control.msg91.com/api/sendotp.php?otp="+otp+'&sender=AESSDW&message='+'Yourotpis'+otp +'&mobile='+mobile+'&authkey='+authkey+'&country=91'
    print(url)
    conn.request("GET", url , headers=headers)
    res = conn.getresponse()
    data = res.read()
    # print(data)

    # conn = http.client.HTTPSConnection("api.msg91.com")

    # payload = "{\"Value1\":\"Param1\",\"Value2\":\"Param2\",\"Value3\":\"Param3\"}"

    # headers = { 'content-type': "application/json" }

    # conn.request("GET", "/api/v5/otp?template_id=&mobile=&authkey=", payload, headers)

    # res = conn.getresponse()
    # data = res.read()
    return None

    # https://api.msg91.com/api/v5/otp?template_id=60cc9ef392fad342c4680705&mobile=919895203267&authkey=362791AzG86a8K60cc822eP1