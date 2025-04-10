namespace Funeral.Common.Responses
{
    public class ResponseResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }

        public ResponseResult(bool success, string message)
        {
            Success = success;
            Message = message;
        }

        public static ResponseResult Ok(string message = "Operation completed successfully")
        {
            return new ResponseResult(true, message);
        }

        public static ResponseResult Fail(string message = "Operation failed")
        {
            return new ResponseResult(false, message);
        }
    }
}
