--
-- PostgreSQL database dump
--

\restrict i8oqQ5K9e3stdTzoIptIDqCSMU9kMp8jN27rtw4IetMyYHMggBhCLkuCz3bGvim

-- Dumped from database version 17.7
-- Dumped by pg_dump version 17.7

-- Started on 2026-02-14 19:34:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16426)
-- Name: cart_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_item (
    id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    "userId" integer,
    "productId" integer
);


ALTER TABLE public.cart_item OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16424)
-- Name: cart_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_item_id_seq OWNER TO postgres;

--
-- TOC entry 4947 (class 0 OID 0)
-- Dependencies: 217
-- Name: cart_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_item_id_seq OWNED BY public.cart_item.id;


--
-- TOC entry 224 (class 1259 OID 16462)
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    "fullName" character varying NOT NULL,
    phone character varying NOT NULL,
    city character varying NOT NULL,
    address character varying NOT NULL,
    email character varying,
    "shippingCost" integer NOT NULL,
    total integer NOT NULL,
    status character varying DEFAULT 'pending'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16461)
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_id_seq OWNER TO postgres;

--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 223
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- TOC entry 222 (class 1259 OID 16455)
-- Name: order_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_item (
    id integer NOT NULL,
    quantity integer NOT NULL,
    price integer NOT NULL,
    "orderId" integer,
    "productId" integer
);


ALTER TABLE public.order_item OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16454)
-- Name: order_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_item_id_seq OWNER TO postgres;

--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 221
-- Name: order_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_item_id_seq OWNED BY public.order_item.id;


--
-- TOC entry 226 (class 1259 OID 16488)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    price integer NOT NULL,
    image character varying NOT NULL,
    type character varying
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16487)
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_id_seq OWNER TO postgres;

--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 225
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- TOC entry 220 (class 1259 OID 16434)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16433)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 4951 (class 0 OID 0)
-- Dependencies: 219
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 4762 (class 2604 OID 16429)
-- Name: cart_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item ALTER COLUMN id SET DEFAULT nextval('public.cart_item_id_seq'::regclass);


--
-- TOC entry 4766 (class 2604 OID 16465)
-- Name: order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- TOC entry 4765 (class 2604 OID 16458)
-- Name: order_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item ALTER COLUMN id SET DEFAULT nextval('public.order_item_id_seq'::regclass);


--
-- TOC entry 4769 (class 2604 OID 16491)
-- Name: product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- TOC entry 4764 (class 2604 OID 16437)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 4933 (class 0 OID 16426)
-- Dependencies: 218
-- Data for Name: cart_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_item (id, quantity, "userId", "productId") FROM stdin;
16	1	4	6
18	1	4	2
15	2	4	3
17	7	4	1
31	1	5	18
32	1	5	23
\.


--
-- TOC entry 4939 (class 0 OID 16462)
-- Dependencies: 224
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."order" (id, "fullName", phone, city, address, email, "shippingCost", total, status, "createdAt", "userId") FROM stdin;
1	hajar	08999	casa	casa	\N	20	950	pending	2026-02-05 08:43:35.372456	1
2	khadija	079999	casa	casa	khadija@gmail.com	20	540	pending	2026-02-05 13:20:54.393093	5
3	hhh	000	casa	casa	hajar@gmail.com	20	1215	pending	2026-02-12 21:32:14.238426	1
4	hh	00	hh	hh	sara@gm	20	1900	pending	2026-02-13 18:40:27.690617	6
5	hajar	09393	casa	casa	a@mail	20	270	pending	2026-02-13 19:23:59.504267	6
6	wissal	0656347865	casa	casa	\N	20	530	pending	2026-02-14 15:48:30.064236	7
\.


--
-- TOC entry 4937 (class 0 OID 16455)
-- Dependencies: 222
-- Data for Name: order_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_item (id, quantity, price, "orderId", "productId") FROM stdin;
1	2	170	1	1
2	1	230	1	5
3	2	180	1	17
4	1	520	2	10
5	1	260	3	18
6	1	220	3	19
7	1	180	3	26
8	1	60	3	30
9	2	30	3	38
10	1	65	3	39
11	2	150	3	42
12	1	50	3	56
13	10	170	4	1
14	1	180	4	12
15	1	250	5	2
16	3	170	6	1
\.


--
-- TOC entry 4941 (class 0 OID 16488)
-- Dependencies: 226
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, description, price, image, type) FROM stdin;
1	Bio-Collagen Real Deep Mask	Masque intensif pour réparer la peau sèche.	170	/frontend/assets/mas1.png	seche
2	Neutrogena Hydro Boost	Hydratation immédiate longue durée.	250	/frontend/assets/n.png	seche
3	Ceramidin Mask	Renforce la barrière cutanée et protège contre le dessèchement.	49	/frontend/assets/ms3.png	seche
4	CeraVe Hydrating Cleanser	Nettoyant doux non moussant pour peaux sèches.	150	/frontend/assets/cerave.png	seche
5	Crème Avène Peau Sèche	Hydratation quotidienne pour peaux sensibles.	230	/frontend/assets/avene.png	seche
6	Farmstay Hyaluronic Cream	Hydratation profonde.	190	/frontend/assets/5.png	seche
7	Clarins Huile Santal	Huile nourrissante intense.	390	/frontend/assets/CLARINS.png	seche
8	Sensilis Hydra Essence	Crème hydratante riche pour peaux sèches.	210	/frontend/assets/image.png	seche
9	Beauty of Joseon Eye Serum	Sérum contour des yeux anti-rides.	280	/frontend/assets/J.png	seche
10	Nuxe Nuxuriance Ultra	Soin anti-âge global.	520	/frontend/assets/NUXE.png	seche
11	Ziaja Med SPF50+	Protection solaire pour peau sèche.	160	/frontend/assets/ziaja.png	seche
12	Crème Hydratante CeraVe 177ml	Hydratation longue durée pour peaux très sèches.	180	/frontend/assets/creaven.png	seche
13	Cetaphil Daily Facial Moisturizer SPF 50	Hydrate tout en protégeant du soleil.	220	/frontend/assets/cetaphil.png	seche
14	Joseon Ginseng Cleansing Oil	Huile démaquillante nourrissante.	250	/frontend/assets/cle.png	seche
15	Clinique Moisture Surge 100H Auto-Replenishing Hydrator	Hydratation continue jusqu'à 100h.	280	/frontend/assets/clini.png	seche
16	Clinique Cleansing Balm / Baume	Démaquille et nettoie en douceur.	290	/frontend/assets/clinque .png	seche
17	La Roche-Posay Effaclar	Régule le sébum sans assécher. Idéal pour zones mixtes.	180	/frontend/assets/effaclar.png	mixte
18	Clinique Moisture Surge	Hydratation légère pour zones sèches des peaux mixtes.	260	/frontend/assets/clini.png	mixte
19	Vichy Normaderm Phytosolution Gel Nettoyant Intense 200ml	Nettoyant pour peaux mixtes à tendance grasse.	220	/frontend/assets/v.png	mixte
20	Bioderma Sebium Gel Moussant Purifiant 200ml	Nettoyant doux qui purifie sans dessécher.	210	/frontend/assets/bio.png	mixte
21	Masque Purifiant pour le Visage à l'Argile Optimals	Élimine impuretés et excès de sébum.	190	/frontend/assets/face.png	mixte
22	Janssen Cosmetics Microsilver Serum 30 ml	Sérum purifiant qui réduit les imperfections.	280	/frontend/assets/Janssen .png	mixte
23	Ultra-Light Super Antioxidant Concentrate Serum	Sérum léger antioxydant pour zones mixtes.	350	/frontend/assets/paula.png	mixte
24	Anthelios SPF50+ Protection solaire	Protection solaire haute, non grasse et résistante à l’eau.	320	/frontend/assets/roch.png	mixte
25	Clinique Cleansing Balm / Baume	Démaquille et nettoie sans dessécher.	290	/frontend/assets/clinque .png	mixte
26	L’Oréal Pure Clay	Masque purifiant pour peaux grasses. Matifie et purifie.	180	/frontend/assets/oreal.png	grasse
27	Cattier Argile Verte	Purifie naturellement et régule le sébum.	150	/frontend/assets/cattier.png	grasse
28	The Ordinary Salicylic 2%	Exfolie en douceur et désobstrue les pores.	200	/frontend/assets/ordin.png	grasse
29	Niacinamide 10%	Régule le sébum et améliore la texture de la peau.	220	/frontend/assets/or.png	grasse
30	Spa Gel Socks, Chaussette avec Gel Hydratant	Hydrate et adoucit intensément les pieds secs grâce à des chaussettes imprégnées de gel.	60	/frontend/assets/pied1.jpg	pieds
31	UreaRepair PLUS Mousse Pour Les Pieds 10 % Urée	Hydrate intensément, soulage la sécheresse et adoucit les pieds rugueux.	175	/frontend/assets/pied2.jpg	pieds
32	Caudalie Crème Beauté des Pieds	Hydrate, adoucit et apaise les pieds fatigués avec un parfum délicat.	160	/frontend/assets/pied3.jpg	pieds
33	Deliplus Fresh & Dry Feet Deodorant	Réduit la transpiration et neutralise les mauvaises odeurs des pieds.	35	/frontend/assets/pied4.jpg	pieds
34	Isdin Ureadin Pieds Gel Oil	Hydrate intensément, adoucit et régénère les pieds très secs.	140	/frontend/assets/pied5.jpg	pieds
35	ETIAXIL Detranspirant Hand & Foot	Réduit efficacement la transpiration excessive des mains et des pieds.	90	/frontend/assets/pied6.jpg	pieds
36	CeraVe Crème Pieds Régénérante SA	Hydrate, répare et lisse les pieds secs et rugueux.	60	/frontend/assets/pied7.jpg	pieds
37	Eucerin UreaRepair PLUS Crème Pieds	Hydrate intensément, répare et adoucit les pieds secs et crevassés.	90	/frontend/assets/pied8.jpg	pieds
38	Neutrogena Crème Mains Concentrée L'Originale	Hydratation intense et réparation des mains très sèches et abîmées.	30	/frontend/assets/main1.jpg	mains
39	Eucerin UreaRepair Plus Crème Mains 5% Urée	Hydrate intensément et soulage immédiatement les mains très sèches.	65	/frontend/assets/main2.jpg	mains
40	Balea Urea Handcreme	Crème mains enrichie en urée pour une hydratation intense et durable.	25	/frontend/assets/main3.jpg	mains
41	Neutrogena Crème Mains Concentrée Sans Parfum	Hydratation intense pour mains très sèches et sensibles.	30	/frontend/assets/main4.jpg	mains
42	The Ritual of Ayurveda Lotion pour les Mains	Hydrate, apaise et laisse les mains délicatement parfumées.	150	/frontend/assets/main5.jpg	mains
43	NUXE Duo Crèmes Mains et Ongles – Rêve de Miel	Hydrate intensément les mains et nourrit les ongles.	190	/frontend/assets/main6.jpg	mains
44	The Ritual of Sakura Lotion pour les Mains	Hydrate et adoucit les mains avec un parfum floral délicat.	150	/frontend/assets/main7.jpg	mains
45	LDR Papaya Whitening Hand & Body Cream	Hydrate et aide à unifier le teint de la peau des mains.	40	/frontend/assets/main8.jpg	mains
46	Hismile - V34 Colour Corrector Serum	Sérum correcteur de teinte pour un sourire éclatant	299	dentaire1.jpg	soins_dentaires
47	Buccotherm Dentifrice Blancheur Au Charbon	Dentifrice au charbon actif pour des dents plus blanches	60	dentaire2.jpg	soins_dentaires
48	BUCCOTHERM Gel dentifrice Gencives Sensibles	Apaise et protège les gencives sensibles	40	dentaire3.jpg	soins_dentaires
49	Parodontax Dentifrice	Aide à prévenir les saignements des gencives	35	dentaire4.jpg	soins_dentaires
50	MARVIS Dentifrice Blanchissant Menthe 85 ml	Dentifrice blanchissant à la menthe intense	120	dentaire5.jpg	soins_dentaires
51	COLGATE Max White Charbon Actif	Blanchit les dents et protège l’émail	20	dentaire6.jpg	soins_dentaires
52	Hismile Coconut Whip Toothpaste	Dentifrice doux au goût noix de coco	99	dentaire7.jpg	soins_dentaires
53	CREST 3D White Professional Effects	Dentifrice professionnel pour dents plus blanches	30	dentaire8.jpg	soins_dentaires
54	CETAPHIL Crème Hydratante 250g	Hydratation intense et durable pour les peaux sèches et sensibles	130	creme1.jpg	cremes
55	SA crème anti-rugosités	Aide à lisser la peau rugueuse et à restaurer la barrière cutanée	120	creme2.jpg	cremes
56	Le Petit Marseillais Lait Corps Nutrition	Nourrit intensément la peau et la laisse douce et souple	50	creme3.jpg	cremes
57	NIVEA LAIT CORPS BEURRE DE CACAO 250ML	Hydratation profonde et nutrition intense pour peaux sèches	45	creme4.jpg	cremes
58	Mixa Corps Intensif Lait Anti-Dessèchement	Hydratation intense 48h pour peaux sèches et sensibles	40	creme5.jpg	cremes
59	Nivea Crème Milk Lait Corporel Déo-Hydratant -Profonde	Hydratation profonde et protection déodorante pour peau douce	50	creme6.jpg	cremes
60	ACM – Dépiwhite Lait Corps Eclaircissant – 500ml	Aide à unifier et éclaircir le teint tout en hydratant la peau	250	creme7.jpg	cremes
61	NUXE PRODIGIEUX LAIT PARFUME 200 ML	Hydrate, adoucit la peau et la parfume délicatement	190	creme8.jpg	cremes
\.


--
-- TOC entry 4935 (class 0 OID 16434)
-- Dependencies: 220
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, name, email, password) FROM stdin;
1	HAJAR	hajar@gmail.com	111
2	latifa	latifa@gmail.com	000
3	wissal	wissal@gmail.com	333
4	sara	sara@gmail.com	000
5	khadija	khadija@gmail	000
6	sara	sara@gmail	111
7	laila	laila@gmail.com	000
\.


--
-- TOC entry 4952 (class 0 OID 0)
-- Dependencies: 217
-- Name: cart_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_item_id_seq', 42, true);


--
-- TOC entry 4953 (class 0 OID 0)
-- Dependencies: 223
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_id_seq', 6, true);


--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 221
-- Name: order_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_item_id_seq', 16, true);


--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 225
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 1, false);


--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 219
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 7, true);


--
-- TOC entry 4779 (class 2606 OID 16471)
-- Name: order PK_1031171c13130102495201e3e20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);


--
-- TOC entry 4771 (class 2606 OID 16432)
-- Name: cart_item PK_bd94725aa84f8cf37632bcde997; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY (id);


--
-- TOC entry 4781 (class 2606 OID 16495)
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- TOC entry 4773 (class 2606 OID 16441)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 4777 (class 2606 OID 16460)
-- Name: order_item PK_d01158fe15b1ead5c26fd7f4e90; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY (id);


--
-- TOC entry 4775 (class 2606 OID 16443)
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- TOC entry 4782 (class 2606 OID 16444)
-- Name: cart_item FK_158f0325ccf7f68a5b395fa2f6a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT "FK_158f0325ccf7f68a5b395fa2f6a" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- TOC entry 4784 (class 2606 OID 16472)
-- Name: order_item FK_646bf9ece6f45dbe41c203e06e0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES public."order"(id) ON DELETE CASCADE;


--
-- TOC entry 4783 (class 2606 OID 16496)
-- Name: cart_item FK_75db0de134fe0f9fe9e4591b7bf; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- TOC entry 4785 (class 2606 OID 16501)
-- Name: order_item FK_904370c093ceea4369659a3c810; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- TOC entry 4786 (class 2606 OID 16482)
-- Name: order FK_caabe91507b3379c7ba73637b84; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES public."user"(id);


-- Completed on 2026-02-14 19:34:48

--
-- PostgreSQL database dump complete
--

\unrestrict i8oqQ5K9e3stdTzoIptIDqCSMU9kMp8jN27rtw4IetMyYHMggBhCLkuCz3bGvim

