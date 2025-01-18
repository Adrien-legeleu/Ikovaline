import IkovalineEmail from "@/emails/IkovalineEmail";
import { Resend } from "resend";
console.log(process.env.RESEND_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      firstname,
      lastname,
      buisnessname,
      secteur,
      etude,
      email,
      tel,
      message,
      category,
    } = await request.json();

    if (!firstname || !lastname || !email || !tel) {
      return new Response(
        JSON.stringify({ error: "Tous les champs sont requis." }),
        { status: 400 }
      );
    }
    const { data, error } = await resend.emails.send({
      from: "contact@ikovaline.com",
      to: ["contact@ikovaline.com"],

      //   to: ["adrienlegeleu@gmail.com"],
      subject: category + ": " + firstname + " vous a envoyé un message",
      react: IkovalineEmail({
        firstName: firstname,
        lastName: lastname,
        email,
        tel,
        message,
        category,
        buisnessname,
        secteur,
        etude,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
