Imports System.Web
Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.Data

' Per consentire la chiamata di questo servizio Web dallo script utilizzando ASP.NET AJAX, rimuovere il commento dalla riga seguente.
' <System.Web.Script.Services.ScriptService()> _
<WebService(Namespace:="http://www.blendingweb.it/")>
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Public Class ws_web
    Inherits System.Web.Services.WebService

    Const K_TokenStatico As String = "A_4uYe8zI16ASXj23esayaEcs8j"

    <WebMethod()> _
    Public Function HelloWorld() As String
        Return "Hello World"
    End Function

    Private Function ChkToken(Token As String) As Integer
        Dim idUtente As Integer = dbSQL.ExecuteScalarI("SELECT id FROM Utenti WHERE Token='" + db.ChkSql(Token) + "' AND TokenScad>GetDate()")
        Return idUtente
    End Function


    <WebMethod()>
    Public Function Login(usr As String, psw As String) As String
        '********************
        '** OUTPUT
        '**  9 = Credenziali valide ma utente bloccato, login fallito
        '**  8 = Password scaduta, login fallito
        '**  7 = Credenziali valide ma sistema in manutenzione
        '**  1 = Credenziali valide, login OK, token rinnovato
        '**  0 = Credenziali errate, login fallito
        '** -1 = Errore durante la verifica delle credenziali

        Try
            Dim dt As DataTable = dbSQL.FillDataTable("SELECT 0 AS Resp,'' AS Token,ID,Nome,Cognome,Email,Bloccato,DataCambioPsw FROM Utenti WHERE Email='" + db.ChkSql(usr) + "' AND psw='" + kript.Kript(db.ChkSql(psw)) + "'")
            If dt.Rows.Count = 0 Then
                Dim R As DataRow = dt.NewRow
                R("Resp") = 0
                dt.Rows.Add(R)
            Else
                Dim R As DataRow = dt.Rows(0)
                If general.Manutenzione = True Then
                    R("Resp") = 7
                ElseIf R("Bloccato") = True Then
                    R("Resp") = 9
                Else
                    Dim P As String = general.GeneraPswUtente()
                    P = kript.Kript(P)
                    dbSQL.ExecuteNonQuery("UPDATE Utenti SET Token='" + db.ChkSql(P) + "',TokenScad=DATEADD(MINUTE,30,GetDate()) WHERE id=" + R("id").ToString)
                    R("Token") = P
                    If db.IntNullD(R("DataCambioPsw")) < Now.AddMonths(-3) Then
                        R("Resp") = 8
                    Else
                        R("Resp") = 1
                    End If
                End If
            End If
            dt.Columns.Remove("Bloccato")
            dt.Columns.Remove("DataCambioPsw")
            Return Newtonsoft.Json.JsonConvert.SerializeObject(dt)
        Catch ex As Exception
            Return "[{""Resp"":""-1""}]"
        End Try
    End Function


    <WebMethod()>
    Public Function GetUserList(Token As String) As String
        '********************
        '** OUTPUT
        '** -1 = Token errato o scaduto
        '** -2 = Errore durante l'elaborazione della richiesta
        Try
            Dim idUtenteLoggato As Integer = ChkToken(Token)
            If idUtenteLoggato = 0 Then
                Return "[{""Resp"":""-1""}]"
            Else
                Dim dt As DataTable = dbSQL.FillDataTable("SELECT * FROM Utenti ORDER BY Cognome,Nome")
                Dim sJSON As String = Newtonsoft.Json.JsonConvert.SerializeObject(dt)
                Return sJSON
            End If
        Catch ex As Exception
            GestErr.WriteErrLog("ws_web.vb", "GetUserList", ex)
            Return "[{""Resp"":""-2""}]"
        End Try
    End Function

    <WebMethod()>
    Public Function createUser(Token As String) As String
        '********************
        '** OUTPUT
        '** -1 = Token errato o scaduto
        '** -2 = Errore durante l'elaborazione della richiesta
        Try
            Dim idUtenteLoggato As Integer = ChkToken(Token)
            If idUtenteLoggato = 0 Then
                Return "[{""Resp"":""-1""}]"
            Else
                Dim dt As DataTable = dbSQL.FillDataTable("SELECT email FROM Utenti WHERE email = 'info@mirtom.it'")
                Dim sJSON As String = Newtonsoft.Json.JsonConvert.SerializeObject(dt)
                Return sJSON
            End If
        Catch ex As Exception
            GestErr.WriteErrLog("ws_web.vb", "createUser", ex)
            Return "[{""Resp"":""-2""}]"
        End Try
    End Function


    <WebMethod()>
    Public Function GetUserData(Token As String, idUsr As String) As String
        '********************
        '** OUTPUT
        '** -1 = Token errato o scaduto
        '** -2 = Errore durante l'elaborazione della richiesta
        '** -3 = Record non trovato
        Try
            Dim idUtenteLoggato As Integer = ChkToken(Token)
            If idUtenteLoggato = 0 Then
                Return "[{""Resp"":""-1""}]"
            Else
                Dim R As DataRow = dbSQL.FillDataRow("SELECT 0 AS Resp,* FROM Utenti WHERE id=" + idUsr.ToString)
                If R Is Nothing Then
                    Return "[{""Resp"":""-3""}]"
                Else
                    R("Resp") = 1
                    Dim sJSON As String = Newtonsoft.Json.JsonConvert.SerializeObject(R)
                    Return sJSON
                End If
            End If
        Catch ex As Exception
            GestErr.WriteErrLog("ws_web.vb", "GetUserList", ex)
            Return "[{""Resp"":""-2""}]"
        End Try
    End Function


    <WebMethod()>
    Public Function SaveUser(Token As String, idUsr As Integer, Cognome As String, Nome As String, Email As String, DataNascita As Date, Altezza As Integer, Peso As Single) As String
        '********************
        '** OUTPUT
        '** >0 = ID nuovo utente
        '**  0 = Dati utenti aggiornati
        '** -1 = Token errato o scaduto
        '** -2 = Errore durante l'elaborazione della richiesta
        '** -3 = Errore durante il salvataggio dei dati
        Dim sJSON As String
        Try
            Dim idUtenteLoggato As Integer = ChkToken(Token)
            If idUtenteLoggato = 0 Then
                sJSON = "[{""Resp"":""-1""}]"
            Else
                Dim IDU As Integer
                Dim Comm As New SqlClient.SqlCommand
                If idUsr = 0 Then
                    Comm.CommandText = "INSERT INTO Utenti (Cognome,Nome,Email,DataNascita,Altezza,Peso) VALUES (@Cognome,@Nome,@Email,@DataNascita,@Altezza,@Peso)"
                    Comm.Parameters.AddWithValue("@Cognome", Cognome)
                    Comm.Parameters.AddWithValue("@Nome", Nome)
                    Comm.Parameters.AddWithValue("@Email", Email)
                    Comm.Parameters.AddWithValue("@DataNascita", DataNascita)
                    Comm.Parameters.AddWithValue("@Altezza", Altezza)
                    Comm.Parameters.AddWithValue("@Peso", Peso)
                    IDU = dbSQL.InsertRecord(Comm)
                    sJSON = "[{""Resp"":""" + IDU.ToString + """}]"
                Else
                    Comm.CommandText = "UPDATE Utenti SET Cognome=@Cognome,Nome=@Nome,Email=@Email,DataNascita=@DataNascita,Altezza=@Altezza,Peso=@Peso WHERE id=@id"
                    Comm.Parameters.AddWithValue("@Cognome", Cognome)
                    Comm.Parameters.AddWithValue("@Nome", Nome)
                    Comm.Parameters.AddWithValue("@Email", Email)
                    Comm.Parameters.AddWithValue("@DataNascita", DataNascita)
                    Comm.Parameters.AddWithValue("@Altezza", Altezza)
                    Comm.Parameters.AddWithValue("@Peso", Peso)
                    Comm.Parameters.AddWithValue("@id", idUsr)
                    IDU = dbSQL.InsertRecord(Comm)
                    If IDU > 0 Then
                        sJSON = "[{""Resp"":""0""}]"
                    Else
                        sJSON = "[{""Resp"":""-3""}]"
                    End If
                End If
            End If
        Catch ex As Exception
            GestErr.WriteErrLog("ws_web.vb", "GetUserList", ex)
            sJSON = "[{""Resp"":""-2""}]"
        End Try
        Return sJSON
    End Function


    '<WebMethod()>
    'Public Function CreaUtentiSoloPerDebug(Cognome As String, Nome As String, Psw As String, Email As String, DataNascita As Date, Altezza As Integer, Peso As Single) As String
    '    Dim Comm As New SqlClient.SqlCommand
    '    Comm.CommandText = "INSERT INTO Utenti (Cognome,Nome,Psw,Email,DataNascita,Altezza,Peso) VALUES (@Cognome,@Nome,@Psw,@Email,@DataNascita,@Altezza,@Peso)"
    '    Comm.Parameters.AddWithValue("@Cognome", Cognome)
    '    Comm.Parameters.AddWithValue("@Nome", Nome)
    '    Comm.Parameters.AddWithValue("@Psw", kript.Kript(Psw))
    '    Comm.Parameters.AddWithValue("@Email", Email)
    '    Comm.Parameters.AddWithValue("@DataNascita", DataNascita)
    '    Comm.Parameters.AddWithValue("@Altezza", Altezza)
    '    Comm.Parameters.AddWithValue("@Peso", Peso)
    '    Return dbSQL.InsertRecord(Comm)
    'End Function

End Class