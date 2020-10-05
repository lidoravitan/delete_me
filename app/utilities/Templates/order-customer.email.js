exports.orderSuccess = ({
  title,
  products,
  city,
  phone,
  notes,
  total,
  orderId,
  fullname,
  address,
  email,
}) => `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body
    style="margin: 0;
  padding: 0;
  background: #f8f8f9;
  direction: rtl;"
  >
    <style>
      @import url(//fonts.googleapis.com/earlyaccess/opensanshebrew.css);

      * {
        font-family: "Open Sans Hebrew", sans-serif;
      }
    </style>
    <div
      style="background: #1ca19b;
    color: #1ca19b;
    height: 10px;
    width: 100%;"
    ></div>
    <div style="padding: 10px;">
      <section
        style="min-width: 300px;
      max-width: 700px;
      margin: auto;
      background-color: #fff;"
      >
        <div
          style="background-image: url(https://ci5.googleusercontent.com/proxy/lVPYBqvU_q3mll8NYzWLXDNU3Qn6Y-RzbdF_OHLL3k8yaPbB5cyH-jXvWMZ2wXAMqfliBSKEoMgBVm-CnxG5gbKF_0amn0DiCcMW203oZJ1hM_wfFPjT_uYTag=s0-d-e1-ft#https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1356/Img7_2x.jpg);
        height: 200px;
        background-size: cover;
        width: 300px;
        margin: auto;"
        ></div>
        <h1 style="text-align: center;">${title}</h1>

        <h4 style="margin-right: 25px; margin-bottom: 5px; color: #7e7e7e">
          מספר עסקה
        </h4>
        <h4 style="margin-right: 25px; margin-bottom: 0;">
          ${orderId}
        </h4>

        <h4 style="margin-right: 25px; margin-bottom: 5px; color: #7e7e7e">
          פרטי ההזמנה
        </h4>
        <ul
          style="margin: auto;
        padding: 0 20px;
        list-style: none;"
        >
       ${products
         .map(({ productName, quantity }) => {
           return `
		 <li
		 style="border-bottom: 1px solid #d9d9d9;
	   padding: 5px;
	   padding-bottom: 10px;"
	   >
		 <span>${productName}</span>
		 <span>-</span>
		 <span>(${quantity})</span>
	   </li>`
         })
         .join(' ')}
        </ul>

        <h4 style="margin-right: 25px; margin-bottom: 5px; color: #7e7e7e">
          פרטי תשלום
        </h4>
		<h4 style="margin-right: 25px; margin-bottom: 0;direction: rtl;">
		${total} ₪
	  </h4>

	  <h4 style="margin-right: 25px; margin-bottom: 5px; color: #7e7e7e">
	  איש קשר
	</h4>
	<h4 style="margin-right: 25px; margin-bottom: 0;">
	  ${fullname}
	  <br />
	  ${phone}
	  <br />
	  ${email}
	</h4>

        <h4 style="margin-right: 25px; margin-bottom: 5px; color: #7e7e7e">
          פרטי משלוח
        </h4>
        <h4 style="margin-right: 25px; margin-bottom: 0;">
		  ${city}
		  <br />
		  ${address}
		</h4>
		
${
  notes
    ? `		<h4 style="margin-right: 25px; margin-bottom: 5px; color: #7e7e7e">
הערות
</h4>
<h4 style="margin-right: 25px; margin-bottom: 0;">
${notes}
</h4>`
    : ``
}


      </section>
    </div>
    <br />
    <footer
      style="background-image: url(https://ci6.googleusercontent.com/proxy/TXzcIAeXtCZGtRXC8adnnF9xDsS27R0Rf3c1O8begOnTZE7wM0bYremd9nEvMw-ZFvVxFw5BsCyPTfeXptBQMvR-R8XQ96-NhkCdnD9qJzPoWDacRV6bzQYk=s0-d-e1-ft#https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1356/footer.png);
    height: 200px;
    border-top: 10px solid #1ca19b;
    background-size: cover;
    min-width: 300px;
    max-width: 700px;
    margin: auto;"
    ></footer>
  </body>
</html>
`
