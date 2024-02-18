export interface Root {
	ok: boolean;
	gallery_edit: string;
	files: File[];
}

export interface File {
	id: string;
	slug: string;
	name: string;
	name_html_escaped: string;
	created_at: string;
	created_at_human: string;
	updated_at: string;
	gallery_id: string;
	url: string;
	original_url: string;
	thumbnail_url: string;
	square_url: string;
	selected: boolean;
	comments_enabled: number;
	comments_count: number;
}
