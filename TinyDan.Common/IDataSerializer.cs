﻿namespace TinyDan.Common
{
    public interface IDataSerializer
    {
        string Serialize(object data);

        T Deserialize<T>(string data);
    }
}
